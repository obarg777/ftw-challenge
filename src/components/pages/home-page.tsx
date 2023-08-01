"use client";

import { PlaylistTrackItemModel } from "@/models/playlist-model";
import { spotifyAccountsService } from "@/services/spotify-accounts.service";
import { spotifyPlaylistsService } from "@/services/spotify-playlists-service";
import { useEffect, useState } from "react";
import { Player } from "../player/player";
import { TrackList } from "../track-list/track-list";
import { HomeContainer } from "./home-page.styles";

export default function HomePage() {
  const [trackItems, setTrackItems] = useState<PlaylistTrackItemModel[]>([]);
  const [currentTrack, setCurrentTrack] =
    useState<PlaylistTrackItemModel | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const fetch = async () => {
    spotifyAccountsService.postCredentials().then(async () => {
      const response = await spotifyPlaylistsService.getPlaylist();

      setTrackItems(response.data.tracks.items);
      setCurrentTrack(response.data.tracks.items[0]);
      setCurrentTrackIndex(0);
    });
  };

  const handleTrackClick = (
    trackItem: PlaylistTrackItemModel,
    index: number
  ) => {
    setCurrentTrack(trackItem);
    setCurrentTrackIndex(index);
  };

  const handleClickBackTrack = () => {
    if (currentTrackIndex > 0) {
      const newIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(newIndex);
      setCurrentTrack(trackItems[newIndex]);
    }
  };

  const handleClickNextTrack = () => {
    if (currentTrackIndex < trackItems.length - 1) {
      const newIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(newIndex);
      setCurrentTrack(trackItems[newIndex]);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <HomeContainer>
      <TrackList trackItems={trackItems} onTrackClick={handleTrackClick} />
      <Player
        trackItem={currentTrack}
        onClickBackTack={handleClickBackTrack}
        onClickNextTack={handleClickNextTrack}
      />
    </HomeContainer>
  );
}
