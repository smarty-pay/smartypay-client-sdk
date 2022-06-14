# SMARTy Pay Client SDK
Simple library for show a custom payment button in any website

## Stable version link
```html
<script src="https://checkout.smartypay.io/sdk/smartypay-client-sdk-v1.js"></script>
```

## Demo
[Online demo](https://checkout.smartypay.io/sdk/smartypay-client-sdk-example.html)

### Donation button
![Button img](content/donation-button-dark.png?raw=true "Title")
```html
<div id="smartypay"></div>
<script src="https://checkout.smartypay.io/sdk/smartypay-client-sdk-v1.js"></script>
<script>
new SmartyPayDonation({
  target: 'smartypay',
  donationId: 'YOUR_DONATION_ID',
  lang: 'en',
  theme: 'dark',
})
</script>
```
- **target** - element id
- **donationId** - you can get it here: https://dashboard.smartypay.io/
- **lang** - `en` by default (also has `es`, `ru`)
- **theme** - `light` (default) or `dark`


### Payment Button
![Button img](content/pay-button-dark.png?raw=true "Title")
```html
<div id="smartypay"></div>
<script src="https://checkout.smartypay.io/sdk/smartypay-client-sdk-v1.js"></script>
<script>
new SmartyPayButton({
  target: 'smartypay',
  apiKey: 'YOUR_API_KEY',
  amount: '1.99',
  token: 'bUSDT',
  lang: 'en',
  theme: 'dark',
})
</script>
```
- **target** - element id
- **apiKey** - you can get it here: https://dashboard.smartypay.io/
- **token** - see valid tokens here: https://docs.smartypay.io/general/supported-tokens
- **amount** - amount for invoice (example 0.99)
- **lang** - `en` by default (also has `es`, `ru`)
- **theme** - `light` (default) or `dark`


### Push Payment button
![Button img](content/push-payment-dark.png?raw=true "Title")
```html
<div id="smartypay"></div>
<script src="https://checkout.smartypay.io/sdk/smartypay-client-sdk-v1.js"></script>
<script>
new SmartyPayPushPayment({
  target: 'smartypay',
  address: 'CLIENT_PUSH_PAYMENT_ADDRESS',
  lang: 'en',
  theme: 'dark',
})
</script>
```
- **target** - element id
- **address** - push-payment address for client
- **lang** - `en` by default (also has `es`, `ru`)
- **theme** - `light` (default) or `dark`

## Usage in React App
See [React Client](https://github.com/smarty-pay/smartypay-client-react)

## Build steps
### Clone repository into your dir
```shell
cd your_dir
git clone https://github.com/smarty-pay/smartypay-client-sdk
```

### Build
```shell
npm install
npm run build
```

## Full docs
Checkout our [TypeDocs](https://smarty-pay.github.io/smartypay-client-sdk/modules.html)