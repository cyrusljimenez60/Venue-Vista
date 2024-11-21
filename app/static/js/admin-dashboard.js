function Record(id, title, city, capacity, price, packages, features, description) {
    this.id = id;
    this.title = title;
    this.city = city;
    this.capacity = capacity;
    this.price = price;
    this.packages = packages;
    this.features = features;
    this.description = description;
}

let eventRecords = [
    new Record(
        1,
        "Event Place Z",
        "New York",
        200,
        300,
        ["Basic Package", "Premium Package"],
        ["WiFi", "Projector", "Air Conditioning"],
        "A great place for events."
    )]