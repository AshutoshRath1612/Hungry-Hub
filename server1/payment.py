import razorpay

razorpay_client = razorpay.Client(auth=("rzp_test_1iMLg2obI6ZsN0", "lklp2qnIOF9DlXYYMRI7FjTf"))

def create_order(amount):
    currency = "INR"  # Change to your currency if different
    order = razorpay_client.order.create({"amount": amount, "currency": currency})
    return order
