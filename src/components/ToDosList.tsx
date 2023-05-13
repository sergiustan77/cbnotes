"use client";
import React from "react";

type Props = {
  todos: any[];
};

const ToDosList = ({ todos }: Props) => {
  return (
    // <List
    //   className="  flex flex-col-reverse justify-center items-center "
    //   sx={{
    //     overflow: "auto",
    //     maxHeight: 500,
    //     overflowX: "hidden",
    //   }}
    // >
    //   {todos.map((t: any, index: number) => (
    //     <ListItem>
    //       {" "}
    //       <Card
    //         className="bg-gray-300"
    //         key={index}
    //         sx={{ minWidth: 275 }}
    //         variant="outlined"
    //       >
    //         <CardContent>
    //           <Typography
    //             sx={{ fontSize: 14 }}
    //             color="text.secondary"
    //             gutterBottom
    //           >
    //             To Do
    //           </Typography>
    //           <Typography variant="h5" component="div">
    //             {t.title}
    //           </Typography>

    //           <Typography variant="body2">{t.content}</Typography>
    //         </CardContent>
    //       </Card>
    //     </ListItem>
    //   ))}
    // </List>
    <></>
  );
};

export default ToDosList;
