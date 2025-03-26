"use client"
import SelectCaptain from "@/components/SelectCaptain";
import { Play } from "next/font/google";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';

type Stage = "NameAdd" | "SelectCaptain" | "SelectTeam";

export default function Home() {

  const [Stage, setStage] = useState<Stage>("NameAdd")
  const [Players, setPlayers] = useState<string[]>([])
  const [Current, setCurrent] = useState("")
  const handelStage = () => {
    if (Players.length < 2) {
      toast.error('Must have at least 2 players', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      return
    }
    else {
      setStage("SelectCaptain")
    }
  }
  const handelDelete = (index: number) => {
    const newPlayers = Players.filter((player, i) => {
      return i !== index
    })
    setPlayers(newPlayers)
  }
  const handelEdit = (index: number) => {
    setCurrent(Players[index])
    handelDelete(index)
  }
  const addPlayers = () => {
    if (Current.trim() === "") {
      return
    }
    const CurrentArray = Current.split(",")
    CurrentArray.forEach((element, index) => {
      CurrentArray[index] = element.trim()
    });
    CurrentArray.forEach((element, index) => {
      if (element === "") {
        CurrentArray.splice(index, 1)
      }
    });
    setPlayers([...Players, ...CurrentArray])
    setCurrent("")
  }
  useEffect(() => {
    const data = localStorage.getItem("Players")
    if (data) {
      setPlayers(JSON.parse(data))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("Players", JSON.stringify(Players))
  }, [Players])

  if (Stage == "NameAdd") {


    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <div className="md:h-[calc(100vh-64px)] flex w-full flex-col h-[calc(100vh-200px)] poppins-regular bg-[#000] text-white">
          {Players.length > 0 ? <h1 className="text-3xl p-5 font-bold">Players:</h1> : <h1 className="text-3xl p-5 font-bold">No Players</h1>}

          {
            Players.map((player, index) => {
              return (
                <div key={index} className="flex w-full items-center justify-between border-b-2 border-gray-700">
                  <h1 className="text-2xl  p-5 font-bold">{player}</h1>
                  <div className="pr-5 flex justify-center items-center gap-8">
                    <button onClick={() => handelEdit(index)}><img className="invert cursor-pointer h-6 w-6" src="/edit.svg" alt="" /></button>
                    <button onClick={() => handelDelete(index)}><img className="invert cursor-pointer h-9 w-9" src="/delete.svg" alt="" /></button>
                  </div>
                </div>
              )
            })
          }

          <div className="fixed bottom-10 w-full gap-2 justify-around border border-t-gray-500 items-center flex p-3 bg-[#000] text-white">

            <div className="relative z-0 mb-5 group">
              <input value={Current} onChange={e => { setCurrent(e.target.value) }} type="text" name="floating_name" id="floating_name" className="block md:w-60 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Name</label>

            </div>
            <button onClick={addPlayers} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 py-2.5 h-fit text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
          </div>
        </div>

        <div className="fixed bottom-40 right-0 p-5 flex justify-around items-center bg-[#000] text-white">
          <button onClick={() => handelStage()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 py-2.5 h-fit text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
        </div>
      </>
    );
  }
  if (Stage == "SelectCaptain") {
    return (
    <>

    <SelectCaptain Players={Players} />
    <div className="fixed bottom-40 right-0 p-5 flex justify-around items-center text-white">
          <button onClick={() => handelStage()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 py-2.5 h-fit text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
        </div>
    </>

    )
  }

}
