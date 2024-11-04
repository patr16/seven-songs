'use client'

import { useEffect, useState } from "react";

import { IProfile } from '@/app/types/types';
import TopTracks from "@/components/topTracks/TopTracks";
import TopArtist from "@/components/topArtist/TopArtist";
import Link from "next/link";

export default function MainPage() {

  const [profile, setProfile] = useState<IProfile>({ display_name: "", images: [] });

  const [topTracks, setTopTracks] = useState([]);

  async function getProfile() {
    let accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const data = await response.json();
    //console.log(data)
    setProfile(data)
  }

  async function getTopTracks() {
    let accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const data = await response.json();

    //console.log(data)

    setTopTracks(data.items)
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <main className="grid min-h-dvh grid-rows-[auto_1fr_auto] container m-auto bg-zinc-800">
      <div className="flex h-32 w-full p-2 items-center justify-center bg-neutral-950 border-b-2 border-zinc-800">
        {<img className="rounded-md" src={profile?.images[0]?.url} height={24} width={64} />}
        <p className="ml-4 text-xl text-white h1">Bienvenid@! <span className="text-green-400 font-bold text-xl">{profile.display_name}</span> </p>
      </div>
      <div className="flex md:flex-row flex-col  items-center">
        <TopTracks />
        <TopArtist />
      </div>


      <footer className="bg-green-400 p-6 items-center text-center text-black">
        <div className="p-2">
          <Link className="font-bold" href="/privacy">Política de privacidad</Link>
        </div>
        <p className="text-slate-950 font-semibold text-opacity-50">2024 - developed by @patrwan</p>

      </footer>
    </main>

  );
}