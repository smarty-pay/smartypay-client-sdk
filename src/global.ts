/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {SmartyPayButton} from './SmartyPayButton';
import {SmartyPayDonation} from './SmartyPayDonation';
import {SmartyPayRechargePayment} from './SmartyPayRechargePayment';


(window as any).SmartyPayButton = SmartyPayButton;
(window as any).SmartyPayDonation = SmartyPayDonation;
(window as any).SmartyPayRechargePayment = SmartyPayRechargePayment;