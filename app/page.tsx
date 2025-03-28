"use client"
import SelectCaptain from "@/components/SelectCaptain";
import { Play } from "next/font/google";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';

type Stage = "NameAdd" | "SelectCaptain" | "SelectTeam";

export default function Home() {
  // To know the current stage of program to generate the UI accordingly
  const [Stage, setStage] = useState<Stage>("NameAdd")
  // Players array to store the names of players
  const [Players, setPlayers] = useState<string[]>([])
  // Current is the name of the player that is being added
  const [Current, setCurrent] = useState("")
  // Captains is the array of 2 captains the setCaptains is shared to SelectCaptain component and then RotatingText component where the captains are selected 
  const [captains, setCaptains] = useState(["", ""])
  // disabled is used to disable the next button for 5 seconds after it is clicked to avoid spamming
  const [disabled, setDisabled] = useState(false)
  // edit is used to check if the user is editing a player or not
  // If the user is editing a player then the edit button will be shown instead of the delete button
  const [edit, setEdit] = useState(false)
  
  // handelNext is used to change the stage to the next stage
  const handelNext = () => {
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
      setDisabled(true)
      setStage("SelectCaptain")
      setTimeout(() => {
        setDisabled(false)
      }, 5000);
    }
  }
  // handelBack is used to change the stage to the previous stage
  const handelBack = () => {
    if (Stage == "SelectCaptain") {
      setCaptains(["", ""])
      setStage("NameAdd")
    }
  }
  // handelDelete is used to delete a player from the Players array
  const handelDelete = (index: number) => {
    const newPlayers = Players.filter((player, i) => {
      return i !== index
    })
    setPlayers(newPlayers)
    // Set the Players array to the local storage this is needed because thew useEffect [Players] will not run if the Players array is empty and there always will be 1 player in local array.
    localStorage.setItem("Players", JSON.stringify(newPlayers));

  }
  // handelEdit is used to edit a player from the Players array
  const handelEdit = (index: number) => {
    if (edit) {
      toast.warning('Finishing current edit first', {
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
    setEdit(true)
    // Set the current input to the player name that is being edited
    setCurrent(Players[index])
    handelDelete(index)
  }
  // addPlayers is used to add the players to the Players array
  const addPlayers = () => {
    setEdit(false)
    // If the current input is empty then return
    if (Current.trim() === "") {
      return
    }
    // Split the input by commas and remove the extra spaces
    const CurrentArray = Current.split(",")
    CurrentArray.forEach((element, index) => {
      CurrentArray[index] = element.trim()
    });
    // Remove the empty strings from the array (if any)
    CurrentArray.forEach((element, index) => {
      if (element === "") {
        CurrentArray.splice(index, 1)
      }
    });
    setPlayers([...Players, ...CurrentArray])
    setCurrent("")
  }
  // Checks if there is Players array in the local storage and sets it to the Players array
  useEffect(() => {
    const data = localStorage.getItem("Players")
    if (data) {
      setPlayers(JSON.parse(data))
    }
  }, [])
  // Saves the Players array to the local storage
  useEffect(() => {
    // If the Players array is not empty and the user is not editing a player then save it to local storage
    if (Players.length > 0 && !edit) {
      localStorage.setItem("Players", JSON.stringify(Players));
    }
  }, [Players])

  // The First stage is to add the names of the players
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
            // Mapping the Players array to display the names of the players
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
            <button onClick={addPlayers} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 py-2.5 h-fit text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{edit ? "Edit" : "Add"}</button>
          </div>
        </div>

        <div className="fixed bottom-40 right-0 p-5 flex justify-around items-center bg-[#000] text-white">
          <button onClick={() => handelNext()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 py-2.5 h-fit text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
        </div>
      </>
    );
  }
  // The Second stage is to select the captains
  if (Stage == "SelectCaptain") {
    return (
      <>

        <SelectCaptain Players={Players} setCaptains={setCaptains} />
        {/* 
          SelectCaptain component to select the captains 
          Takes:
          Players: string[] - The array of players
          setCaptains: React.Dispatch<React.SetStateAction<string[]>> - The function to set the captains 
    */}
        <div className="fixed bottom-40 right-0 p-5 flex justify-around items-center text-white">
          {/* Does not let the user continue until captains are selected and 5 sec has passed to avoid error on next stage if captains are not selected for some reason */}
          <button disabled={!(captains[0]) || disabled} onClick={() => handelNext()} className="text-white disabled:bg-blue-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 py-2.5 h-fit text-center">Next</button>
        </div>
        <div className="fixed bottom-40 left-0 p-5 flex justify-around items-center text-white">
          <button onClick={() => handelBack()} className="text-white disabled:bg-blue-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 py-2.5 h-fit text-center">Back</button>
        </div>
      </>

    )
  }

}
