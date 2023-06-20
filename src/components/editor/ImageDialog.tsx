import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Link } from "lucide-react";
import React from "react";
type Props = {
  editor: any;
};

export function ImageDialog({ editor }: Props) {
  const [imageUrl, setImageUrl] = React.useState("");

  const [imageFile, setImageFile] = React.useState("");

  const handleImageUpload = (event: any) => {
    setImageFile(event.target?.files[0]);
  };
  const sendImageToCloud = async (event: any) => {
    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append("upload_preset", "kman64bz");
    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((r) => r.json())
      .then((data) => {
        editor.chain().focus().setImage({ src: data.url }).run();
      });
  };
  const addImageURL = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
    setImageUrl("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"iconCircle"} variant="outline">
          <Image className="w-4 h-4"></Image>
        </Button>
      </DialogTrigger>
      <DialogContent className=" container   grid place-items-center">
        <DialogHeader className="w-full">
          <DialogTitle>Add a picture</DialogTitle>
          <DialogDescription>From your device or an URL</DialogDescription>
        </DialogHeader>
        <div className="  w-full">
          <Tabs defaultValue="picture-device" className="w-full">
            <TabsList className="grid   grid-cols-2">
              <TabsTrigger value="picture-device">Your device</TabsTrigger>
              <TabsTrigger value="picture-url">URL</TabsTrigger>
            </TabsList>
            <TabsContent className="" value="picture-device">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Upload a picture from your device
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      onChange={handleImageUpload}
                      className="cursor-pointer hover:bg-muted"
                      id="picture"
                      accept="image/*"
                      type="file"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  {" "}
                  <DialogTrigger className="w-full">
                    {" "}
                    <Button
                      disabled={imageFile ? false : true}
                      onClick={sendImageToCloud}
                      className="w-full"
                      type="submit"
                    >
                      Add Image
                    </Button>
                  </DialogTrigger>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="picture-url">
              <Card>
                <CardHeader>
                  <CardDescription>Insert a picture URL.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="picture-url">Picture URL</Label>
                    <Input
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                      }}
                      id="picture-url"
                      type="text"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  {" "}
                  <DialogTrigger className="w-full">
                    {" "}
                    <Button
                      disabled={imageUrl ? false : true}
                      onClick={addImageURL}
                      className="w-full"
                      type="submit"
                    >
                      Add Image
                    </Button>
                  </DialogTrigger>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
