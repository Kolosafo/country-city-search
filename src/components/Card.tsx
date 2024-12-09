import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function CardDetail({ title }: { title: string }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
