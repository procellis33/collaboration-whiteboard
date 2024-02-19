import { redirect, RedirectType } from "next/navigation";
const BoardPage = () => {
  redirect("/", RedirectType.replace);
};

export default BoardPage;
