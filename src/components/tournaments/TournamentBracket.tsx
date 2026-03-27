"use client";

import { useState } from "react";

interface BracketNodeProps {
  match: any;
  teamsMap: Record<string, string>;
  onMatchClick?: (match: any) => void;
}

function BracketNode({ match, teamsMap, onMatchClick }: BracketNodeProps) {
  const team1Name = match.team1Id ? teamsMap[match.team1Id] : "TBD";
  const team2Name = match.team2Id ? teamsMap[match.team2Id] : "TBD";

  // Is this node currently clickable? (Only if it's not locked AND both teams are known)
  const isClickable = onMatchClick && !match.locked && match.team1Id && match.team2Id;

  return (
    <div 
      className={`bg-[#1A1A1A] border-[1.5px] ${match.locked ? 'border-[#00FF87]/50 shadow-[0_0_10px_rgba(0,255,135,0.1)]' : 'border-[#2A2A2A]'} rounded-lg w-56 flex flex-col overflow-hidden ${isClickable ? 'cursor-pointer hover:border-primary hover:shadow-[0_0_15px_rgba(0,255,135,0.2)] transition-all' : ''}`}
      onClick={() => isClickable && onMatchClick(match)}
    >
      <div className={`flex justify-between items-center p-3 text-sm font-sans ${match.winnerId === match.team1Id ? 'bg-primary/20 text-primary font-bold border-b border-primary/30' : 'text-white border-b border-[#2A2A2A]'}`}>
        <span className="truncate pr-2 font-medium">{team1Name}</span>
        <span className="font-mono bg-[#111111] px-2.5 py-1 rounded text-xs">{match.score1}</span>
      </div>
      <div className={`flex justify-between items-center p-3 text-sm font-sans ${match.winnerId === match.team2Id ? 'bg-primary/20 text-primary font-bold' : 'text-white'}`}>
        <span className="truncate pr-2 font-medium">{team2Name}</span>
        <span className="font-mono bg-[#111111] px-2.5 py-1 rounded text-xs">{match.score2}</span>
      </div>
    </div>
  );
}

export function TournamentBracket({ matches, registrations, onMatchClick }: { matches: any[], registrations: any[], onMatchClick?: (match: any) => void }) {
  if (!matches || matches.length === 0) return null;

  const teamsMap = registrations.reduce((acc, curr) => {
    acc[curr.id] = curr.teamName;
    return acc;
  }, {} as Record<string, string>);

  const rounds = matches.reduce((acc: any, match: any) => {
    if (!acc[match.round]) acc[match.round] = [];
    acc[match.round].push(match);
    return acc;
  }, {});

  const totalRounds = Math.max(...Object.keys(rounds).map(Number));

  return (
    <div className="flex w-full overflow-x-auto pb-8 pt-10 min-h-[500px]">
      {Array.from({ length: totalRounds }).map((_, i) => {
        const roundNum = i + 1;
        const roundMatches = rounds[roundNum] || [];
        
        roundMatches.sort((a: any, b: any) => a.position - b.position);

        return (
          <div key={roundNum} className="flex flex-col justify-around mr-12 lg:mr-16 space-y-6 relative shrink-0">
            <h4 className="absolute -top-8 left-0 text-sm font-heading font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Round {roundNum}</h4>
            {roundMatches.map((match: any, matchIndex: number) => (
              <div key={match.id} className="relative flex-1 flex flex-col justify-center my-2">
                <BracketNode match={match} teamsMap={teamsMap} onMatchClick={onMatchClick} />
                
                {/* Connectors */}
                {roundNum < totalRounds && (
                  <>
                    <div className="absolute top-1/2 -right-6 lg:-right-8 w-6 lg:w-8 h-[1.5px] bg-[#333333]" />
                    {match.position % 2 !== 0 ? (
                      <div className="absolute top-1/2 -right-6 lg:-right-8 w-[1.5px] h-[calc(50%+1rem)] bg-[#333333]" />
                    ) : (
                      <div className="absolute bottom-1/2 -right-6 lg:-right-8 w-[1.5px] h-[calc(50%+1rem)] bg-[#333333]" />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
