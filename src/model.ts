class Card {
  suit: string;
  value: string;

  constructor(suit: string, value: string) {
    this.suit = suit;
    this.value = value;
  }

  public getRankNumber(): number {
    let rank = new Map<string, number>([
      ["A", 11],
      ["2", 2],
      ["3", 3],
      ["4", 4],
      ["5", 5],
      ["6", 6],
      ["7", 7],
      ["8", 8],
      ["9", 9],
      ["10", 10],
      ["J", 10],
      ["Q", 10],
      ["K", 10],
    ]);

    return rank.get(this.value) ?? 0;
  }

  public showCard(): void {
    console.log(`${this.suit}(${this.value})`);
  }
}

class Deck {
  cards: Card[];

  constructor() {
    this.reset();
  }

  drawOne(): Card | undefined {
    if (this.cards.length === 0) {
      throw new Error("デッキにカードがありません");
    }
    return this.cards.pop();
  }

  reset(): void {
    let suits: string[] = ["H", "D", "S", "C"];
    let values: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", ];

    for (let suit in suits) {
      for (let value in values) this.cards.push(new Card(suit, value));
    }
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    } 
  }

  showDeck(): void {
    this.cards.forEach((card: Card) => {
      console.log(card.showCard());
    })
  }
}

class GameDecision {
  action: string;
  amount: number;

  constructor(action: string, amount: number) {
    this.action = action;
    this.amount = amount;
  }
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
