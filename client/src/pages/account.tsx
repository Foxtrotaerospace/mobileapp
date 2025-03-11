import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, BookOpen, Heart } from "lucide-react";

export default function Account() {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Guest User</h2>
              <p className="text-muted-foreground">Space Explorer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start gap-2" size="lg">
          <Heart className="w-5 h-5" />
          Liked Content
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2" size="lg">
          <BookOpen className="w-5 h-5" />
          Learning Progress
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2" size="lg">
          <Settings className="w-5 h-5" />
          Settings
        </Button>
      </div>
    </div>
  );
}
