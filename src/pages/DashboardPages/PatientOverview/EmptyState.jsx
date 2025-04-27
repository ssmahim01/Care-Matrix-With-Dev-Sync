import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        {description}
      </p>
      <Link to={actionLink}>
        <Button className="cursor-pointer">{actionLabel}</Button>
      </Link>
    </div>
  );
}
