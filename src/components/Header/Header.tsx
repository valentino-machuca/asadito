import { IonIcon } from '@ionic/react';
import s from './Header.module.scss';
import logo from '../../../assets/icon-only.png';

const HeaderCustom: React.FC<{title: string, icon: any, isIcon: boolean}> = ({title, icon, isIcon}) => {

  return (
   <div className={s.container} style={{marginLeft: isIcon ? '5%' : '0'}}>
       {isIcon ? <IonIcon aria-hidden="true" icon={icon} style={{marginRight: '10px'}}/> : <img src={logo} alt='logo'/>}
       {title}
   </div>
  );
};

export default HeaderCustom;
