# Omelette
* Eggs
* Milk
* Salt & black pepper
* Cheese
* Onion, bell pepper

# Pancakes
* Flour
* Eggs
* Milk
* Sugar
* Baking powder
* Butter

# Beignets
* Flour
* Yeast
* **Milk**
* Butter
* Sugar
* Salt
* **Eggs**
* Vanilla extract
 
# Miso Cookies
* Butter
* Brown sugar
* **Milk**
* Flour
* Miso paste
* Baking powder
* Baking soda
* **Eggs**

# Lemon Garlic Pasta
* minced garlic
* pasta
* olive oil
* butter
* salt & pepper
* **fins sauce**
* italian persley
* lemon zest * juice
# Crispy Fried Egg
* eggs
* natural cooking oil
* salt & pepper



# Music Composer
## 1. Input
- Primary input: a simple **mood** such as `happy`, `sad`, or `calm`.  
  This is universally understood and friendly for non-musicians.
- Optional (for musicians): directly **specify a key** such as `C major` or `A minor`.
- Defaults: if the user provides nothing, the program **randomly picks** a mood and maps it to a reasonable tempo.

Example mapping :
- `happy → C major, ~120 BPM`
- `sad → A minor, ~80–90 BPM`
- `calm → D major, ~70–80 BPM`

## 2. Output
The program will generate a simple text file (`.txt`) containing the list of musical notes. This format was chosen because it is the easiest to implement for a beginner without requiring any special libraries.
**Example (.txt):**
C4 1
E4 1
G4 2
A4 1
F4 1

## 3. Representation
The program represents each musical note as a pair `(pitch, duration)`.

Example:
('C4', 1)

This represents the note C in the 4th octave, held for 1 full beat.

**Conventions**
- `pitch`: strings like `C4`, `D#4`, `G3`.
- `duration`: number of beats. Typical mapping:
  - `1` = quarter note (1 beat)
  - `2` = half note (2 beats)
  - `4` = whole note (4 beats)

Using beats as plain numbers keeps the format simple and easy to extend later.

## 4. Logic
Goal: generate a short melody with a fixed total number of beats (e.g., 16).
Rules:
1. **Pick note set** from the chosen key (e.g., C major scale).
2. **Start note**: choose the tonic or a chord tone (I/III/V) for stability.
3. **Next note selection** (keep it musical but simple):
   - Prefer **small steps** (neighbor notes in the scale).
   - Allow **occasional repeats** (same note) to create a tiny motif.
   - Use **rare jumps** (bigger intervals) to avoid monotony.
4. **Rhythm choice**: pick from a small pool like `[1, 1, 1, 2]` (mostly 1-beat, sometimes 2-beat).
5. **Cadence**: prefer the tonic near the end so it feels finished.

## 5. Termination
Use a hard limit on **total beats** (e.g., 16).  
Once the sum of durations reaches the target, generation stops.  
This guarantees the loop terminates cleanly.

## 6. Extensions
- **Structure:** Longer pieces will suffer without a clear form. Most songs follow a fixed form.
- **Variation between sections:** Even with a fixed form, sections should vary (motif repetition with small changes, contour/rhythm tweaks) to avoid sounding repetitive.
- **Multiple voices/tracks:** Real music often uses more than one part (melody + accompaniment, bass, or counter-melody). Supporting multiple channels would make the result richer.
