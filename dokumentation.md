# Landrup-Dans  
Magnus Borregaard, WU13  

## Tech Stack

### Next.js
Next.js er et JavaScript-framework bygget på React. Det er komponentbaseret og har filbaseret routing.  
Jeg har valgt Next.js, fordi det giver faste rammer og struktur i projektet. I modsætning til ren React kommer Next.js med routing og server rendering fra start, hvilket gør udviklingen mere struktureret og production-klar.

### API
Projektet bruger et REST API til at håndtere data. Frontend kommunikerer med backend via HTTP-requests (GET, DELETE m.m.).

### Tailwind CSS
Tailwind er et utility-first CSS-framework.  
Jeg har valgt Tailwind, fordi styling og HTML er samlet samme sted, hvilket gør det mere overskueligt. Alternativt kunne man bruge SASS eller vanilla CSS, som giver mere frihed, men mindre struktur.

---

## Kodeeksempel

```javascript
export async function leaveActivity(activityId) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) return redirect("/login")

  const response = await fetch(
    `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`,
    { 
      method: "DELETE", 
      headers: { Authorization: `Bearer ${token}` }, 
      cache: "no-store" 
    }
  )

  if (!response.ok) throw new Error("Kunne ikke afmelde aktivitet")

  revalidatePath(`/aktiviteter/${activityId}`)
  return { success: true }
}

```

Det jeg har her er et stykke kode, som bruges til at afmelde en bruger fra en aktivitet. Det er en server action i Next.js, hvilket betyder, at funktionen kører på serveren og håndterer både sikkerhed og kommunikation med API’et. Først hentes accessToken og userId fra cookies for at identificere og validere brugeren. Hvis en af dem mangler, bliver brugeren automatisk sendt videre til login-siden. Derefter sendes en autoriseret DELETE-request til API’et med et Bearer token, så backend kan verificere, at brugeren har rettighed til at udføre handlingen. Hvis requesten ikke lykkes, kastes der en fejl. Til sidst revalideres den relevante side, så brugerfladen opdateres og afspejler ændringen med det samme.


## Perspektivering

Jeg adskiller min ui og data-logik ved at bruge server actions hvilket gør koden mere overskulig.
Jeg bruger camelCase og beskrivende funktionsnavne som fx "leaveActivity"  
I et rigtigt production-miljø ville man dog nok fokusere mere på fx error handling og sikkerhed