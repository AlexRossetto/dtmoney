import { useContext } from "react";
import { Container } from "./styles";
import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import totalImage from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTransactions";


export function Summary() {

  const {transactions} = useTransactions()

  // const totalDeposits = transactions.reduce((acc, transaction) => {
  //   if(transaction.type === 'deposit') {
  //     return acc + transaction.amount;
  //   }
  //   return acc
  // }, 0)

  const summary = transactions.reduce((acc, transactions) => {
    if(transactions.type === 'deposit') {
      acc.totalDeposits += transactions.amount;
      acc.total += transactions.amount;
    } else {
      acc.totalWithdraws += transactions.amount;
      acc.total -= transactions.amount;
    }
    return acc
  }, {totalDeposits: 0, totalWithdraws: 0, total: 0})

  return(
    <Container>
      {/* <TransactionContext.Consumer>
        {(data) => {
          console.log(data)

          return <p>ok</p>
        }}
      </TransactionContext.Consumer> */}
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImage} alt="entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.totalDeposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImage} alt="Saídas" />
        </header>
        <strong>
          - {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.totalWithdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImage} alt="entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}