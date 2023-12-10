class Team {
  constructor(name, owner, wins, losses, points) {
    this.owner = owner;
    this.name = name;
    this.wins = wins;
    this.losses = losses;
    this.points = points;
  }
}

class Game {
  constructor(team1Name, team1Score, team2Name, team2Score) {
    this.team1Name = team1Name;
    this.team1Score = team1Score;
    this.team2Name = team2Name;
    this.team2Score = team2Score;
  }
}

const App = {
  data() {
    return {
      teams: [],
      games: []
    }
  },
  
  created() {
    this.reset();
  },

  methods: {
    reset() {
      this.resetTeams();
      this.resetGames();
      this.sortTeams();
    },

    resetTeams() {
      this.teams = [
        new Team("Alvin and the Draftcunts", "chris1747", 10, 3, 1818.92),
        new Team("The Glove Don't Fit", "CamUK", 9, 4, 1531.52),
        new Team("Sacks in the city", "DonKelly", 8, 5, 1443.44),
        new Team("Trevor able to Gibb Chase", "jb997", 7, 6, 1540.94),
        new Team("King Sacko", "KingSacko79", 7, 6, 1500.16),
        new Team("The Fuckest Uppest", "jmfryan", 7, 6, 1479.48),
        new Team("The big Lambowski", "Bearcelona", 6, 7, 1662.16),
        new Team("Je ne saquon", "jridgway57", 6, 7, 1550.54),
        new Team("Dak Lives Matter", "CPomB", 6, 7, 1492.08),
        new Team("Glasgow Quitters/Losers", "danbridle", 6, 7, 1277.94),
        new Team("Unsolicited Diggs Pics", "agentshowers", 5, 8, 1464.56),
        new Team("Najee Smugglers", "platty83", 1, 12, 1224.82)
      ];
    },

    resetGames() {
      this.games = [
        new Game("Unsolicited Diggs Pics", 114.2, "Je ne saquon", 141.39),
        new Game("King Sacko", 97.20, "Alvin and the Draftcunts", 126.66),
        new Game("Trevor able to Gibb Chase", 99.83, "The big Lambowski", 110.08),
        new Game("The Glove Don't Fit", 100.78, "Najee Smugglers", 94.12),
        new Game("The Fuckest Uppest", 156.76, "Dak Lives Matter", 132.87),
        new Game("Glasgow Quitters/Losers", 150.72, "Sacks in the city", 132.84),
      ];
    },

    onScoreChange() {
      this.resetTeams();
      this.sortTeams();
    },

    sortTeams() {
      this.games.forEach((game) => {
        let team1 = this.teams.find((team) => team.name === game.team1Name);
        let team2 = this.teams.find((team) => team.name === game.team2Name);

        team1.points = Math.round(((team1.points + game.team1Score) + Number.EPSILON) * 100) / 100
        team2.points = Math.round(((team2.points + game.team2Score) + Number.EPSILON) * 100) / 100

        if (game.team1Score > game.team2Score) {
          team1.wins++;
          team2.losses++;
        } else {
          team2.wins++;
          team1.losses++;
        }
      });

      this.teams.sort(function(team1, team2) {
        if (team1.wins === team2.wins) {
          return team2.points - team1.points;
        } else {
          return team2.wins - team1.wins;
        }
      })
    }
  }

}

Vue.createApp(App).mount("#app")