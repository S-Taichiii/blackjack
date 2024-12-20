class Card {
  suit: string;
  value: string;

  constructor() {}

  public getRankNumber(): number {}

  public showCard(): void {}
}

class Deck {
  cards: Card[];

  constructor() {}
  drawOne(): Card {}
  reset(): void {}
  shuffle(): void {}
  showDeck(): void {}
}

class GameDecision {
  action: string;
  amount: number;

  constructor() {}
}

class Player {
  name: string;
  type: string;
  hand: Card[];
  chips: number = 400;
  bet: number = 0;
  winAmount: number = 0;
  gameStatus: string = "betting";

  constructor() {}
  promptPlayer(userData: number | null): GameDecision {}
  getTotalRank(): number {}
}

class Table {
  gameMode: string = "blackjack";
  betDenominations: number[];
  private turnCounter: number;
  players: Player[];
  house: Player;
  deck: Deck;
  gamePhase: string;
  resultsLog: string[];

  constructor() {}

  private assignHands(): void {}
  private evaluateMove(player: Player): void {}
  private blackjackEvaluateAndGetRoundResults(): string {}
  private initializePlayersState(): void {}
  private initializeDeck(): void {}
  private getTurnPlayer(): Player {}
  public haveTurn(userData: number | null): void {}
  private onFirstPlayer(): boolean {}
  private onLastPlayer(): boolean {}
  private allPlayerActionsCompleted(): boolean {}
}
