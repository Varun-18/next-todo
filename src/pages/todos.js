import TodoListing from "@components/TodoListing";
import Layout from "@layouts/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import ProtectedRoute from "@pages/Protected";

const Todos = () => {
  const router = useRouter();
  const { status } = useSession();

  console.log(status);

  if (status === "authenticated") {
    return <TodoListing />;
  } else if (status === "unauthenticated") {
    router.replace("/");
  }
};

export default Todos;
