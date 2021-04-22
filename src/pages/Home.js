// import useFetch from "../utils/useFetch";

// import useFetch from "../utils/useFetch";

const Home = () => {
  // const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')
// https://cloud-wallet-api.${env}.affinity-project.org/api/v1

  const url = "https://cloud-wallet-api.prod.affinity-project.org/api/v1/users/login"
  // const data = useFetch(url);
  return (
    <div className="home">
      <h1>Home</h1>
      {/* { data && <div>{data}</div> } */}
    </div>
  );
}
 
export default Home;
