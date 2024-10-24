import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setText,setDone } from "../redux/textSlice";
import { thunkDeleting, thunkFetching, thunkPosting } from "../redux/thunk";

const Home = () => {
    const text = useSelector((state) => state.text.value);
    const texts = useSelector((state) => state.text.texts);
    const done=useSelector((state)=>state.text.done)
    console.log(done,"done");
    console.log(texts, "aray");
    // console.log(text);
    const dispatch = useDispatch();
    // for initial data fetching

    useEffect(() => {
        dispatch(thunkFetching());
    }, []);
    return (
        <div>
            {/* in this automatically set action.type="text/setText" action.payload=e.target.value */}
            <form
                action=""
                onSubmit={async (e) => {
                    e.preventDefault();
                    await dispatch(thunkPosting({ text }));
                    //  for data fetching by pressing button

                    dispatch(thunkFetching());

                    console.log("submit");
                }}
            >
                <input onChange={(e) => dispatch(setText(e.target.value))} type="text" />
                <button>+</button>
            </form>
            <div>
                {texts.map((x, ind) => (<div key={ind} style={{backgroundColor:done.includes(x.id)?"green":"red"}}>
                    <div  >{x.text}</div>
                    <button onClick={async()=>{
                      if(done.includes(x.id)){
                       await dispatch(thunkDeleting(x.id))
                       dispatch(thunkFetching())

                      }
                      dispatch(setDone(x.id))
                      }}>{done.includes(x.id)?"remove":"done"}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
