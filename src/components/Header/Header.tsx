import { IonIcon } from '@ionic/react';
import s from './Header.module.scss';

const HeaderCustom: React.FC<{title: string, icon: any}> = ({title, icon}) => {
  return (
   <div className={s.container}>
      <IonIcon aria-hidden="true" icon={icon} style={{marginRight: '10px'}}/>
      {title}
   </div>
  );
};

export default HeaderCustom;
