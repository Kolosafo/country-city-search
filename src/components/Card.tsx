import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function CardDetail({ title }: { title: string }) {
  return (
    <Card className="md:w-[350px] w-40 ">
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
