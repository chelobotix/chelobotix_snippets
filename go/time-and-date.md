# Time and Date

https://www.pauladamsmith.com/blog/2011/05/go_time.html
https://www.bytesizego.com/blog/golang-time


```go
02 representa el día.
01 representa el mes.
2006 representa el año.

Element	Possible values
Year	"2006", "06"
Month	"Jan", "January", "01", "1"
Day of the week	"Mon", "Monday"
Day of the month	"2", "_2", "02"
Day of the year	"__2", "002"
Hour	"15", "3", "03" (PM or AM)
Minute	"4", "04"
Second	"5", "05"
AM/PM mark	"PM"
```

```go
// TODAY
now := time.Now()
	layout := "02-01-2006"
	today := now.Format(layout)
	fmt.Println(today) // => 23-01-2025
```

```go
// OPERATIONS
newDate := now.AddDate(-1, 0, 0) //ano, mes, dia
```

```go
// SINCE
start := time.Now()
elapsed := time.Since(start)
```

```go
// FUTURE
time.Now().Add(24 * time.Hour) //24 horas desde ahora
```

```go
// PARSE DATE
// "2006-01-02" Formato estándar: Año-Mes-Día
sd := r.Form.Get("start_date")


layout := "2006-01-02"

startDate, err := time.Parse(layout, sd)

if err!= nil{
	helpers.ServerError(w, err)
}
```

```go
// UNPARSED
d := time.Date(2025, 12, 30, 12, 0, 0, 0, time.UTC)
d1 := d.Format("2006-01-02") // => 2025-12-30
```

```go
// FOR LOOP
for currentDate.Before(endDate) || currentDate.Equal(endDate) {
}

//
```

```go
// COMPARE
date1.Before(date2) // true si date1 < date2
date1.After(date2) // true si date1 > date2
date1.Equal(date2) // true si date1 == date2


```

```go
// EXTRAER FECHA
year, month, day := date1.Date()

// con layout
actualDate := Date1.Format("01/2006")

// Si necesitas los valores separados
year, month, day := b.interestCalculation.StartDate.Date()
monthStr := fmt.Sprintf("%02d", month)
yearStr := fmt.Sprintf("%d", year)
```

```go
// TIME ZONE
currentTime := time.Now().UTC()


loc := time.UTC
dateLayout = "2006-01-02"
myDate, err := time.ParseInLocation(dateLayout, unmarshalled.EndDate, loc)
```
