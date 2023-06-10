import useRoute from "../router";

export default function Home() {
  const routing = useRoute(false);
  return routing;
}
