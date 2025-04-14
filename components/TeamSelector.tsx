import React from 'react'
import DelayedMapping from './Mapping';

type Teams = {
    team1: string[];
    team2: string[];
    bichi?: string;
}

const TeamSelector = ({ captains, Players }: { captains: string[]; Players: string[] }) => {
    const selectTeam = (): Teams => {
        // Filter out the captains from the players array
        const playersWOcap = Players.filter((player) => player !== captains[0] && player !== captains[1]);
        // Initialize team1 with captain 1
        const team1 = [captains[0]];
        // Initialize team2 with captain 2
        const team2 = [captains[1]];
        // Initialize bichi (The person who will play for both team) as undefined
        let bichi =  undefined;
        // If the number of players without captains is odd, select a random player to be the bichi
        // and remove them from the players array
        if (playersWOcap.length % 2 != 0) {
            const j = Math.floor(Math.random() * playersWOcap.length)
            bichi = playersWOcap[j];
            playersWOcap.splice(j, 1);
        }
        while (playersWOcap.length > 0) {
                // Randomly select half of the remaining players to be on team1
                let randomIndex = Math.floor(Math.random() * playersWOcap.length);
                team1.push(playersWOcap[randomIndex]);
                playersWOcap.splice(randomIndex, 1);
                if (playersWOcap.length > 0) {
                    // Randomly select the other half to be on team2
                    randomIndex = Math.floor(Math.random() * playersWOcap.length);
                    team2.push(playersWOcap[randomIndex]);
                    playersWOcap.splice(randomIndex, 1);
                }
            }
            return { team1, team2, bichi };
        }
        const { team1, team2, bichi } = selectTeam();
    return (
        <div className='flex flex-col items-center pt-10 md:min-h-[calc(100vh-65px)] min-h-[calc(100vh-49px)] bg-zinc-900 text-white'>
            <h1 className='font-bold text-2xl text-center'>Teams are</h1>
            <div className='flex w-full h-[calc(100vh-400px)] justify-center mt-10'>
                <div className='w-1/2 flex flex-col items-center'>
                    <h2 className='font-bold text-xl border-b-2 border-gray-500 w-full text-center'>{captains[0]}&apos;s team</h2>
                    <div className='w-full p-5'>
                        <ul className='flex flex-col gap-3'>
                            <DelayedMapping names={team1} />
                        </ul>
                    </div>

                </div>
                <div className='h-full min-h-96 w-px bg-gray-500'></div>
                <div className='w-1/2 flex flex-col items-center'>
                    <h2 className='font-bold text-xl border-b-2 border-gray-500 w-full text-center'>{captains[1]}&apos;s team</h2>
                    <div className='w-full p-5'>
                        <ul className='flex flex-col gap-3'>
                            <DelayedMapping names={team2} />
                        </ul>
                    </div>
                </div>
            </div>
            {bichi && (
                <>
                <h3 className='text-xl font-bold'>Bichi-</h3>
                <div className='text-lg font-bold'><DelayedMapping names={[bichi]} timeInterval={Players.length/2 *500} /></div>
                </>
                )}
        </div>
    )
}

export default TeamSelector