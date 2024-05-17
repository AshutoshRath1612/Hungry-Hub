import razorpay

razorpay_client = razorpay.Client(auth=())

def create_order(amount):
    currency = "INR"  # Change to your currency if different
    order = razorpay_client.order.create({"amount": amount, "currency": currency})
    return order
