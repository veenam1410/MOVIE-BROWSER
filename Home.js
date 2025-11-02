import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";

const fetchMovies = async(page=1)=>{
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await fetch(`https://www.omdbapi.com/?s=avengers&apikey=8426a8e0&page=${page}`);
    return res.json();
}
const Home = () => {

    const [page, setPage] = useState(1);

    const { data, status } = useQuery({
    queryKey: ['movies', page],
    queryFn: ()=> fetchMovies(page),
    keepPreviousData: true,
    });
    console.log(status);
    console.log(data);

    const totalPages = data?.totalResults ? Math.ceil(Number(data.totalResults) / 10) : 1;

    return ( 
        <div className="container main">
            <div className="pagination">
                <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>Previous</button>
                <span> Page {page} </span>
                <button onClick={() => setPage(old => Math.min(old + 1, totalPages))} disabled={page === 5}>Next</button>
            </div>

            {status === 'pending' && (<div >Loading....</div>)}
            {status === 'success' && (<div className="content">{data.Search.map(movie => (
                <motion.div whileHover={{scale: 1.1, boxShadow: "0px 0px 10px #E4004B"}} key={movie.imdbID} className="movie-card">
                    <h4>{movie.Title}</h4>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} width="200" />
                </motion.div>
            ))}</div>)}
            
        </div>
     );
}
 
export default Home;