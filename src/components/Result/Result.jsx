import "./Result.scss";
import { useEffect, useState } from "react";

const Result = ({totalQuestions, result, onTryAgain}) =>{
    
    const[name, setName] = useState("");
    const[highScores, sethighScores] = useState([]);
    const[showScores, setshowScores] = useState(false);

    useEffect(()=>{
        sethighScores(JSON.parse(localStorage.getItem("highScores"))|| []);
    }, []);
    
    const handleSave = () =>{
        const score = {
            name,
            score: result.score
        };
        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score);
        sethighScores(newHighScores);
        setshowScores(true);
        localStorage.setItem("highScores", JSON.stringify(newHighScores));
    };

   

    const handleTryAgain = () =>{
        setshowScores(false);
        sethighScores([]);
        onTryAgain();
    }
    
    return(
    <div className="result">
        <h3>
        Result 
        </h3>
        <p>
            Total Questions: <span>{totalQuestions}</span>
        </p>
        <p>
            Total Score: <span>{result.score}</span>
        </p>
        <p>
            Correct Answers: <span>{result.correctAnswers}</span>
        </p>
        <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
        </p>
        <button onClick={handleTryAgain}>
            Try again
        </button>
        {!showScores ?<>
            <h3>
                Enter your name bellow <br/> to save your score!
            </h3>
            <input 
            placeholder="Your Name"
            value = {name} 
            onChange = {(evt) => setName(evt.target.value)} 
            />
            <button onClick={handleSave}>
                Save
            </button>
        </> :<>
        <table>
            <thead>
                <tr>
                    <th>Ranking</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                    {highScores.map((highScore, i) =>{
                    return(
                    <tr key={`${highScore.score}${highScore.name}${i}`}>
                        <td>{i+1}</td>
                        <td>{highScore.name}</td>
                        <td>{highScore.score}</td>
                    </tr>

                    );
                    })}
                    
                    
                </tbody>
            
        </table>
        </>}
        
    </div>
    );

};


export default Result;