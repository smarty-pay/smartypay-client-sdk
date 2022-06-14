/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {SmartyPayButton} from './SmartyPayButton';
import {SmartyPayDonation} from './SmartyPayDonation';
import {SmartyPayPushPayment} from './SmartyPayPushPayment';


(window as any).SmartyPayButton = SmartyPayButton;
(window as any).SmartyPayDonation = SmartyPayDonation;
(window as any).SmartyPayPushPayment = SmartyPayPushPayment;