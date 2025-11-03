import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";
import Main from "./Main";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import ParticleSettings from "./ParticleSettings";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  /**
   * Conexión al proveedor Ethereum del navegador.
   *
   * Explicación:
   * - Si `window.ethereum` existe: el navegador (o extensión) expone el nuevo proveedor EIP-1193
   *   (por ejemplo MetaMask moderno). Se crea una instancia de Web3 con ese proveedor y se
   *   solicita acceso a las cuentas del usuario llamando a `enable()` (método antiguo) para
   *   activar la prompt de permiso.
   *
   * - Si `window.ethereum` no existe pero `window.web3` sí: se utiliza el proveedor antiguo
   *   inyectado (legacy dapp browsers). En ese caso tomamos `window.web3.currentProvider`.
   *
   * - Si ninguno existe: mostramos una alerta indicando que no hay un wallet/Proveedor Ethereum
   *   disponible (p. ej. MetaMask), por lo que la aplicación no podrá interactuar con la cadena.
   *
   * Notas y mejores prácticas:
   * - `window.ethereum.enable()` está deprecado; la forma recomendada es usar:
   *     await window.ethereum.request({ method: 'eth_requestAccounts' })
   *   Esto devuelve una promesa que resuelve con la lista de cuentas autorizadas.
   *
   * - Considera usar `ethers.js` para una API más moderna y menos propensa a romperse con
   *   proveedores diferentes.
   *
   * - Siempre maneja posibles rechazos (user denied permissions) con try/catch y muestra UX
   *   adecuada (por ejemplo un mensaje que explique que la app necesita permisos).
   */
  async loadWeb3() {
    try {
      if (window.ethereum) {
        // Proveedor moderno (EIP-1193). Crea la instancia de Web3 con el proveedor.
        window.web3 = new Web3(window.ethereum);

        // Solicita acceso a las cuentas del usuario. `enable()` funciona pero está deprecado.
        // Recomendado:
        // await window.ethereum.request({ method: 'eth_requestAccounts' })
        await window.ethereum.enable();
      } else if (window.web3) {
        // Proveedor legacy inyectado (ej: versiones antiguas de MetaMask o dapp browsers).
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        // No hay proveedor inyectado; avisar al usuario que instale MetaMask u otro wallet.
        window.alert(
          "Non ethereum browser detected. You should consider Metamask!"
        );
      }
    } catch (error) {
      // Manejo básico de errores (p. ej. usuario rechazó la solicitud de conexión)
      console.error("Error connecting to web3 provider:", error);
      window.alert("No se pudo conectar al wallet. Comprueba los permisos.");
    }
  }

  /* loadBlockchainData: obtiene las cuentas desde el proveedor web3
  - Llama a `web3.eth.getAccounts()` que devuelve un array de cuentas autorizadas
  - Normalmente la cuenta por defecto está en `accounts[0]` (usar para `this.setState({ account: ... })`)
  - Hay que manejar el caso de arrays vacíos (usuario no autorizó) y errores de conexión
  - Nota: si `loadWeb3` no pidió permisos, `getAccounts()` puede devolver [] */
  async loadBlockchainData() {
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      console.log("accounts:", accounts);

      // Validar que hay al menos una cuenta conectada
      if (!accounts || accounts.length === 0) {
        window.alert(
          "No se detectaron cuentas. Conecta tu wallet y acepta los permisos."
        );
        return;
      }

      // Usa la cuenta localmente para evitar race-condition con setState (setState es asíncrono)
      const account = accounts[0];
      this.setState({ account });

      const networkId = await web3.eth.net.getId();
      console.log("Network ID:", networkId);

      // LOAD Tether TOKEN
      const tetherData = Tether.networks[networkId];
      console.log("TetherData", tetherData);
      if (tetherData) {
        const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
        console.log("Tether: ", tether);
        this.setState({ tether });

        // Usar la variable `account` garantizando que no sea undefined
        let tetherBalance = await tether.methods.balanceOf(account).call();
        this.setState({ tetherBalance: tetherBalance.toString() });
        console.log("Tether balance", tetherBalance);
      } else {
        window.alert("tether contract not deployed to detected network");
      }

      // LOAD RWD TOKEN
      const rwdTokenData = RWD.networks[networkId];
      console.log("Reward Token", rwdTokenData);
      if (rwdTokenData) {
        const rwd = new web3.eth.Contract(RWD.abi, rwdTokenData.address);
        console.log("RWD: ", rwd);
        this.setState({ RWD });
        let rwdTokenBalance = await rwd.methods.balanceOf(account).call();
        console.log("RWD balance", rwdTokenBalance);
        this.setState({ rwdTokenBalance: rwdTokenBalance.toString() });
      } else {
        window.alert("Reward Token contract not deployed to detected network");
      }

      // LOAD DecentralBank TOKEN
      const decentralBankData = DecentralBank.networks[networkId];
      console.log("DecentralBank", decentralBankData);
      if (decentralBankData) {
        const decentralBank = new web3.eth.Contract(
          DecentralBank.abi,
          decentralBankData.address
        );
        console.log("DecentralBank: ", decentralBank);
        this.setState({ decentralBank });
        let stakingBalance = await decentralBank.methods
          .stakingBalance(account)
          .call();
        console.log("Staking balance", stakingBalance);
        this.setState({ stakingBalance: stakingBalance.toString() });
      } else {
        window.alert("DecentralBank contract not deployed to detected network");
      }
    } catch (error) {
      console.error("Error en loadBlockchainData:", error);
      window.alert(
        "Error al cargar datos de la blockchain. Revisa la consola para más detalles."
      );
    }
    this.setState({ loading: false });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdTokenBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    let content;
    {
      this.state.loading
        ? (content = (
            <p
              id="loader"
              className="text-center"
              style={{ color: "white", margin: "30px" }}
            >
              LOADING PLEASE...
            </p>
          ))
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              rwdBalance={this.state.rwdTokenBalance}
              stakingBalance={this.state.stakingBalance}
              stakeTokens={this.stakeTokens}
              unstakeTokens={this.unstakeTokens}
              decentralBankContract={this.decentralBank}
            />
          ));
    }
    return (
      <div className="App" style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>
          <ParticleSettings />
        </div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px", minHeight: "100vh" }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
/*
  stakeTokens = (amount) => {
    this.setState({loading: true })
    this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading:false})
      })
    }) 
  }

  unstakeTokens = () => {
    this.setState({loading: true })
    this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({loading:false})
    }) 
  }
 */

export default App;
