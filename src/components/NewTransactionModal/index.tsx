import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeButton from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [ title, setTitle ] = useState('');
  const [ value, setValue ] = useState(0);
  const [ category, setCategory] = useState('');
  const [type, setType] = useState('');

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    await createTransaction({
      title,
      amount: value,
      category,
      type
    })

    setTitle('');
    setValue(0)
    setCategory('')
    setType('deposit')

    onRequestClose();
  }

  return(
    <Modal 
    isOpen={isOpen} 
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeButton} alt="close button"/>
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="number" placeholder="Valor" value={value} onChange={(e) => setValue(Number(e.target.value))}/>
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="entrada"/>
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)}/>
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}