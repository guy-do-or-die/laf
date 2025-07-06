import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Separator } from "./separator";
import { Alert, AlertDescription } from "./alert";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/app/lib/utils";

export function PageContainer({ children, className, ...props }) {
  return (
    <div className={cn("container mx-auto px-4 py-8 max-w-4xl", className)} {...props}>
      {children}
    </div>
  );
}

export function PageHeader({ title, description, children, className, ...props }) {
  return (
    <div className={cn("text-center mb-8", className)} {...props}>
      {title && (
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
      )}
      {description && (
        <p className="text-lg text-gray-600 mb-6">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export function PageSection({ title, children, className, ...props }) {
  return (
    <Card className={cn("mb-6", className)} {...props}>
      {title && (
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? "pt-0" : undefined}>
        {children}
      </CardContent>
    </Card>
  );
}

export function GridLayout({ children, columns = 3, className, ...props }) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };
  
  return (
    <div 
      className={cn(
        "grid gap-6", 
        gridCols[columns] || gridCols[3], 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

const alertIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle
};

const alertVariants = {
  info: "default",
  success: "default",
  warning: "default",
  error: "destructive"
};

export function StatusAlert({ type = "info", title, children, className, ...props }) {
  const Icon = alertIcons[type];
  const variant = alertVariants[type];
  
  return (
    <Alert variant={variant} className={cn("mb-6", className)} {...props}>
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className,
  ...props 
}) {
  return (
    <Card 
      className={cn(
        "retro-card max-w-md mx-auto",
        className
      )} 
      {...props}
    >
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        {Icon && (
          <Icon className="w-12 h-12 text-gray-400 mb-4" />
        )}
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-500 mb-6 max-w-sm">
            {description}
          </p>
        )}
        {action}
      </CardContent>
    </Card>
  );
}

export function LoadingGrid({ count = 6, columns = 3 }) {
  return (
    <GridLayout columns={columns}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="h-64">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </GridLayout>
  );
}