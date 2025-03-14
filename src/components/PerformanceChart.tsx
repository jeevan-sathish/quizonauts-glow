
import { useQuiz } from "@/context/QuizContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PerformanceChart() {
  const { quizResult } = useQuiz();
  
  if (!quizResult) return null;
  
  const data = [
    { name: 'Correct', value: quizResult.correctAnswers, color: '#10b981' },
    { name: 'Incorrect', value: quizResult.wrongAnswers, color: '#ef4444' },
    { name: 'Unanswered', value: quizResult.unanswered, color: '#94a3b8' }
  ];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ 
    cx, cy, midAngle, innerRadius, outerRadius, percent, index 
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={14}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} questions`, name]}
                contentStyle={{ 
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                iconSize={10}
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
