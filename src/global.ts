/**
 * Smarty Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import { SmartyPayButton } from './SmartyPayButton';
import { SmartyPayDonation } from './SmartyPayDonation';
import { SmartyPayRechargePayment } from './SmartyPayRechargePayment';
import { SmartyPaySubscriptions } from './SmartyPaySubscriptions';

(window as any).SmartyPayButton = SmartyPayButton;
(window as any).SmartyPayDonation = SmartyPayDonation;
(window as any).SmartyPayRechargePayment = SmartyPayRechargePayment;
(window as any).SmartyPaySubscriptions = SmartyPaySubscriptions;
