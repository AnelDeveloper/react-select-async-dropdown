# Select Component Documentation

Glavna Komponenta
Select Komponenta: Glavna komponenta odgovorna za odabir stavki i njihovo prikazivanje.

Radi poboljšanja čitljivosti i održavanja, projekt je rasporedjen na nekoliko manjih komponenti, svaka sa specifičnom ulogom:

Dropdown Komponenta: Prikazuje padajuću listu stavki.
Cip Komponenta: Upravlja i prikazuje odabrane stavke.
Modal Komponenta: Pruža modalni overlay za mobilni prikaz.

Optimizacija Performansi

Virtualizacija: Implementirana pomoću biblioteke react-window za efikasno upravljanje velikim listama tako što se renderiraju samo vidljive stavke.
Memoizacija: Iskorištena HOC React.memo kako bi se spriječili nepotrebni ponovni renderi komponenti.
Debouncing: Primijenjena je debouncing tehnika za efikasno rukovanje događajima prilikom skrolovanja.
Paginacija

Projekt uključuje osnovnu funkcionalnost paginacije. Postojale su neke poteškoće sa logikom paginacije.
