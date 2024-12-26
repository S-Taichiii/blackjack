import { userInput } from "./type";

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
    this.cards = [];
    this.initialize();
    this.shuffle();
  }

  drawOne(): Card {
    if (this.cards.length === 0) {
      throw new Error("デッキにカードがありません");
    }

    let card: Card = this.cards.pop();
    return card;
  }

  initialize(): void {
    let suits: string[] = ["H", "D", "S", "C"];
    let values: string[] = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++)
        this.cards.push(new Card(suits[i], values[j]));
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
    });
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
  chips: number;
  bet: number;
  winAmount: number;
  gameStatus: string;

  constructor(name: string, type: string, chips: number = 400) {
    this.name = name;
    this.type = type;
    this.hand = [];
    this.chips = chips;
    this.bet = 0;
    this.winAmount = 0;
    this.gameStatus = "betting";
  }

  promptPlayer(userData?: userInput): GameDecision {
    if (userData) {
      let action: string = userData.action;
      let amount: number = userData.amount;

      return new GameDecision(action, amount);
    }
  }

  getTotalRank(): number {
    if (this.hand.length === 0) return 0;

    let totalRank: number = 0;
    let aceCounter: number = 0;
    this.hand.forEach((card: Card) => {
      if (card.value === "A") aceCounter++;
      totalRank += card.getRankNumber();
    });

    if (aceCounter > 0) {
      while (totalRank > 21) totalRank -= 10;
    }

    return totalRank;
  }

  initialize() {
    this.hand = [];
    this.bet = 0;
    this.winAmount = 0;
    this.gameStatus = "betting";
  }
}

class Table {
  private gameMode: string;
  betDenominations: number[];
  private turnCounter: number;
  private players: Player[];
  private house: Player;
  private deck: Deck;
  private gamePhase: string;
  private resultsLog: string[];

  constructor() {
    this.gameMode = "blackjack";
    this.betDenominations = [1, 5, 10, 50, 100];
    this.turnCounter = 0;

    for (let i = 1; i <= 3; i++) {
      if (i === 2) {
        this.players.push(new Player("user", "user"));
        continue;
      }
      this.players.push(new Player(`AI${i}`, "AI"));
    }

    this.house = new Player("house", "house", 0);

    this.deck = new Deck();
    this.gamePhase = "betting";
    this.resultsLog = [];
  }

  private assignHands(): void {
    if (this.gameMode === "blackjack") {
      this.players.forEach((player: Player) => {
        player.hand.push(this.deck.drawOne());
        player.hand.push(this.deck.drawOne());
      });

      this.house.hand.push(this.deck.drawOne());
    }
  }

  private evaluateMove(player: Player): void {}

  private blackjackEvaluateAndGetRoundResults(): string {}

  private initializePlayersState(): void {
    if (this.players.length === 0) return;

    this.players.forEach((player) => {
      player.initialize();
    });

    this.house.initialize();
  }

  private initializeDeck(): void {
    this.deck.initialize();
    this.deck.shuffle();
  }

  private getTurnPlayer(): Player {
    let turnIndex: number = this.turnCounter % this.players.length;

    return this.players[turnIndex];
  }

  private onFirstPlayer(): boolean {
    let turnIndex: number = this.turnCounter % this.players.length;
    return turnIndex === 0;
  }

  private onLastPlayer(): boolean {
    let turnIndex: number = this.turnCounter % this.players.length;
    return turnIndex === this.players.length - 1;
  }

  private allPlayerActionsCompleted(): boolean {
    this.players.forEach((player) => {
      if (player.gameStatus === "betting") return false;
    });

    if (this.house.gameStatus === "betting") return false;

    return true;
  }

  public haveTurn(userData?: userInput): void {
    if (this.gamePhase === "betting") {
      this.initializeDeck();
      this.assignHands();
    } else if (this.gamePhase === "acting") {
    } else if (this.gamePhase === "evaluating") {
    } else {
    }

    this.turnCounter++;
  }
}
