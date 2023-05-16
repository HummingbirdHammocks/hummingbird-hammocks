export const fulfillmentStatusChipColor = status => {
    switch (status) {
        case "FULFILLED":
            return "success"
        case "IN_PROGRESS":
            return "warning"
        case "ON_HOLD":
            return "warning"
        case "OPEN":
            return "default"
        case "PARTIALLY_FULFILLED":
            return "info"
        case "PENDING_FULFILLMENT":
            return "info"
        case "RESTOCKED":
            return "default"
        case "SCHEDULED":
            return "warning"
        case "UNFULFILLED":
            return "info"
        default:
            return "default"
    }
}

export const financialStatusColor = status => {
    switch (status) {
        case "AUTHORIZED":
            return "success"
        case "EXPIRED":
            return "error"
        case "PAID":
            return "success"
        case "PARTIALLY_PAID":
            return "warning"
        case "PARTIALLY_REFUNDED":
            return "warning"
        case "PENDING":
            return "warning"
        case "REFUNDED":
            return "error"
        case "VOIDED":
            return "error"
        default:
            return "default"
    }
}