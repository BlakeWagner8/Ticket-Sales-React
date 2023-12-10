import React from 'react';
import './App.css';
import web3 from './web3';
import ticketsale from './ticketsale';

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      manager: '',
      availableTickets: '',
      price: '',
    };

    this.stateGetTicketOf = {
      ticketOwnerAddress: ''
    };

    this.handleSubmitBuyTicket = this.handleSubmitBuyTicket.bind(this);

    this.handleSubmitReturnTicket = this.handleSubmitReturnTicket.bind(this);

    this.handleSubmitOfferTicketSwap = this.handleSubmitOfferTicketSwap.bind(this);
    
    this.handleSubmitAcceptTicketSwap = this.handleSubmitAcceptTicketSwap.bind(this);

    this.handleSubmitGetTicket = this.handleSubmitGetTicket.bind(this);

  }
  
  async componentDidMount() {
    const manager = await ticketsale.methods.manager().call();
    const availableTickets = await ticketsale.methods.availableTickets().call();
    const price = await ticketsale.methods.ticketPrice().call();
    // const tickets = await ticketsale.methods.tickets(0).call();
    this.setState({ 
      'manager':manager, 
      'availableTickets': availableTickets, 
      'price': price,
    });
  }

  //Buy ticket handlers
  handleSubmitBuyTicket = async (event) =>{
    event.preventDefault()
    alert(`
      ____Your Details____\n
      Price : ${this.state.price}
      Ticket ID : ${this.state.buyTicketID}
    `)
    const accounts = await web3.eth.getAccounts();

    await ticketsale.methods.buyTicket(this.state.buyTicketID).send({
      from: accounts[0]
     });
  }

  //Return ticket handlers
  handleSubmitReturnTicket = async (event) =>{
    event.preventDefault()
    alert(`
       Return Details   \n
       Price : ${this.state.price}
       Ticket ID : ${this.state.returnTicketID}
    `)
    const accounts = await web3.eth.getAccounts();

    await ticketsale.methods.returnTicket(this.state.returnTicketID).send({
      from: accounts[0]
    });
  }

  //Offer ticket swap handlers
  handleSubmitOfferTicketSwap = async (event) =>{
    event.preventDefault()
    alert(`
       Return Details   \n
       Price : ${this.state.price}
       Ticket ID : ${this.state.offerSwapTicketID}
    `)
    const accounts = await web3.eth.getAccounts();

    await ticketsale.methods.offerSwap(this.state.offerSwapTicketID).send({
      from: accounts[0]
    });
  }

  //Accept ticket swap handlers
  handleSubmitAcceptTicketSwap = async (event) =>{
    event.preventDefault()
    alert(`
       Return Details   \n
       Price : ${this.state.price}
       Ticket ID : ${this.state.acceptSwapTicketID}
    `)
    const accounts = await web3.eth.getAccounts();

    await ticketsale.methods.acceptSwap(this.state.acceptSwapTicketID).send({
      from: accounts[0]
    });
  }

  //Get Ticket ID handlers
  handleSubmitGetTicket = async (event) =>{
    event.preventDefault()
    alert(`
       Details   \n
       Price : ${this.state.price}
       User Address : ${this.stateGetTicketOf.ticketOwnerAddress}
    `)
    const accounts = await web3.eth.getAccounts();

    await ticketsale.methods.getTicketOf(this.stateGetTicketOf.ticketOwnerAddress).send({
      from: accounts[0]
    });
  }


//Render Components on Page
 render() {
   return (
     <div>
      {/* Page navbar and header */}
      <div class="navbar">
        <h1>Ticket Sales</h1>
      </div>
       <p class="pageHeader">
       This site is owned by {this.state.manager}<br></br>
       There are currently {this.state.availableTickets} available Tickets
       </p>

       <hr color="Gray" size="3px" width="1500px"/>

      {/* Buy Ticket Button */}
       <form class="format" onSubmit={this.handleSubmitBuyTicket}>
         <h4 class="subheader">Purchase a Ticket</h4>
         <div>
           <label>Enter a Ticket ID: </label>
           <input
              placeholder='Enter Ticket ID'
              id="buyTicketID"
              name="buyTicketID"
              onChange={(event) => this.setState({[event.target.name]: event.target.value})}
           />
         </div>
         <div>
         <button name="BuyTicket">Buy</button>
         </div>
       </form>

      {/* Return Ticket button */}
       <form class="format" onSubmit={this.handleSubmitReturnTicket}>
        <h4 class="subheader">Return a Ticket</h4>
        <div>
          <label>Enter a ticket ID to Return: </label>
          <input
              placeholder='Enter Ticket ID'
              id="returnTicketID"
              name="returnTicketID"
              onChange={(event) => this.setState({[event.target.name]: event.target.value})}
          />
        </div>
        <div>
          <button name="ReturnTicket">Return</button>
        </div>
       </form>

       {/* Offer swap button */}
       <form class="format" onSubmit={this.handleSubmitOfferTicketSwap}>
        <h4 class="subheader">Offer to Swap a Ticket</h4>
        <div>
          <label>Enter a ticket ID you would like to swap for: </label>
          <input
              placeholder='Enter Ticket ID'
              id="offerSwapTicketID"
              name="offerSwapTicketID"
              onChange={(event) => this.setState({[event.target.name]: event.target.value})}
          />
        </div>
        <div>
          <button name="OfferTicketSwap">Offer Swap</button>
        </div>
       </form>

       {/* Accept Ticket Swap */}
       <form class="format" onSubmit={this.handleSubmitAcceptTicketSwap}>
        <h4 class="subheader">Accept a Ticket Swap</h4>
        <div>
          <label>Enter the ticket ID to swap for: </label>
          <input
              placeholder='Enter Ticket ID'
              id="acceptSwapTicketID"
              name="acceptSwapTicketID"
              onChange={(event) => this.setState({[event.target.name]: event.target.value})}
          />
        </div>
        <div>
          <button name="AcceptTicketSwap">Accept Ticket Swap</button>
        </div>
       </form>

      {/* GetTicketOf */}
       <form class="format" onSubmit={this.handleSubmitGetTicket}>
        <h4 class="subheader">Accept a Ticket Swap</h4>
        <div>
          <label>Enter the user address to get ticket ID: </label>
          <input
              placeholder='Enter user address'
              id="ticketOwnerAddress"
              name="ticketOwnerAddress"
              onChange={(event) => this.setState({[event.target.name]: event.target.value})}
          />
        </div>
        <div>
          <button name="GetTicketId">Get Ticket ID</button>
        </div>
       </form>

       <hr color="Gray" size="3px" width="1500px"/>
     </div>
   );
 }
}


export default App;