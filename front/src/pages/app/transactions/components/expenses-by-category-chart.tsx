import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { Transaction } from '@/services/transactions/types';
import { TransactionType } from '@/services/transactions/types';

type ExpensesByCategoryChartProps = {
  readonly transactions: Transaction[];
};

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100);
};

export function ExpensesByCategoryChart({
  transactions,
}: ExpensesByCategoryChartProps) {
  const { chartData, chartConfig } = useMemo(() => {
    const expensesByCategory = transactions
      .filter((t) => t.type === TransactionType.EXPENSE && t.categoryId)
      .reduce(
        (acc, t) => {
          const categoryId = t.categoryId?._id ?? 'uncategorized';
          const categoryName = t.categoryId?.name ?? 'Uncategorized';

          if (!acc[categoryId]) {
            acc[categoryId] = {
              name: categoryName,
              amount: 0,
            };
          }
          acc[categoryId].amount += t.amount;
          return acc;
        },
        {} as Record<string, { name: string; amount: number }>,
      );

    const sortedCategories = Object.entries(expensesByCategory)
      .map(([id, { name, amount }]) => ({ id, name, amount }))
      .sort((a, b) => b.amount - a.amount);

    const data = sortedCategories.map((category) => ({
      category: category.id,
      name: category.name,
      amount: category.amount,
      formattedAmount: formatCurrency(category.amount),
      fill: `var(--color-${category.id})`,
    }));

    const config: ChartConfig = {
      amount: {
        label: 'Amount',
      },
      ...sortedCategories.reduce(
        (acc, category, index) => {
          acc[category.id] = {
            label: category.name,
            color: CHART_COLORS[index % CHART_COLORS.length],
          };
          return acc;
        },
        {} as Record<string, { label: string; color: string }>,
      ),
    };

    return { chartData: data, chartConfig: config };
  }, [transactions]);

  const hasData = chartData.length > 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-75"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    nameKey="category"
                    formatter={(value, _name, item) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                          style={{ backgroundColor: item.payload.fill }}
                        />
                        {chartConfig[item.payload.category]?.label}
                        <div className="ml-auto font-mono font-medium">
                          {formatCurrency(value as number)}
                        </div>
                      </>
                    )}
                  />
                }
              />
              <Pie data={chartData} dataKey="amount" nameKey="category" />
              <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex h-75 items-center justify-center text-muted-foreground">
            No expense data to display
          </div>
        )}
      </CardContent>
    </Card>
  );
}
