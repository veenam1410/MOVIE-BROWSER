import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Search = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("query");
    
    const fetchMovies = async () => {
        if(!searchTerm) return { Search: [] };
        const res = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=8426a8e0`);
        return res.json();
    }

    const { data, status } = useQuery({
        queryKey: ['movies', searchTerm],
        queryFn: fetchMovies,
        enabled: !!searchTerm
    });

    console.log(status);
    console.log(data);
    return ( 
        <div className="container main">
            {status === 'success' && (<div className="content">{data?.Search?.map(movie => (
                <motion.div whileHover={{scale: 1.1, boxShadow: "0px 0px 10px #E4004B"}} key={movie.imdbID} className="movie-card">
                    <h4>{movie.Title}</h4>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} width="200" />
                </motion.div>
            ))}</div>)}
            
        </div>
    );
}
 
export default Search;