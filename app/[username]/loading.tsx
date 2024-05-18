import Skeleton from "@/components/Skeleton";
function loading() {
  return [1, 2, 3, 4, 5, 6].map((i) => <Skeleton image={true} key={i} />);
}

export default loading;
