import { IonIcon } from '@ionic/react';
import { chevronForwardCircle, wallet } from 'ionicons/icons';
import s from './Transaction.module.scss';

// Helpers
import formatearImporte from '../../helpers/formatearImporte';

const Transaction: React.FC<{result: any, delay: number}> = ({result, delay}) => {
  return (
    <div className={s.container} style={{animationDelay: `.${2+delay}s`}}>
      <div className={s.deudor}>
        <p>{result.deudor}</p>
      </div>
      <div className={s.arrow}>
        <IonIcon aria-hidden="true" icon={chevronForwardCircle} style={{fontSize: '1.5em', color: '#328f4e'}}/>
        <p>{formatearImporte(result.monto)}</p>
      </div>
      <div className={s.acreedor}>
        <p>{result.acreedor}</p>
      </div>
    </div>
  )
}

export default Transaction;