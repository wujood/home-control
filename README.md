# 🏠 Home Control – Raspberry Pi Smart Home Controller

*“Because why *not* make your decade-old toaster do DevOps?”*

Welcome to **Home Control**, the smart home controller for people who looked at their dusty Raspberry Pi 1 (yes, the one from 2012) and thought, _"Hmm, I bet I could force this into relevance."_

Built with a **modern REST API**, a **real database**, and running on **just 4GB of storage**, this project is proof that you can, indeed, teach an old Pi new tricks. Slowly. Very slowly.

## 🤔 Why

- **Reviving Old Hardware**
  The Pi 1 is basically the Nokia 3310 of SBCs: outdated, indestructible, and lying in a drawer somewhere. Why not resurrect it for something useful instead of letting it sit in e-waste limbo?

- **Minimal Resource Consumption**
  It sips power like it's on a juice cleanse—perfect for always-on tasks like controlling your lights or reminding you that you're too cheap to upgrade.

- **Good Enough Performance™**
  No, it won’t serve 100k concurrent users. But are you running Amazon from your living room? No? Then stop whining and enjoy your 400ms response times like a real minimalist.

- **Modern Software on Antique Hardware**
  Nothing says “tech wizard” like cramming Node.js into 4GB of storage and watching your Pi try to keep up like a pensioner at a rave.

## ✨ Features

- Built specifically for the Raspberry Pi 1 because we enjoy pain
- Fancy-pants REST API so your fridge can talk to your toaster
- Fits in tight storage spaces (like a Pi 1 SD card or your 2006 iPod)
- Modern Node.js backend that screams “I shouldn’t be here”

## 🛠️ Setup & Installation

### Prerequisites

- Raspberry Pi 1 (yes, _that_ one)
- Raspberry Pi OS
- 4GB+ SD card (no, you can’t just delete Candy Crush)
- An internet connection, preferably faster than the Pi

### 0. 🧠 Mental Preparation

Every command you run might crash the OS. Or worse—hang forever, forcing you to question your life choices. This setup is best to be done as a side hustle. Queue things up and walk away:

```bash
nohup <any command> > output.log 2>&1 &
```

Then go do taxes, mow the lawn, or rewatch an entire Netflix series. You'll be back just in time to catch the next `npm ci` failure.

### 1. System Update

This is your first test of patience.

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

_Spoiler: You may finish a coffee, a meal, and a nap before this completes._

### 2. Install Dependencies

The part where you _gently_ force bleeding-edge tech into 2012 silicon.

```bash
# Get Node.js 21.x (yes, it works on ARMv6—barely)
wget https://unofficial-builds.nodejs.org/download/release/v21.7.3/node-v21.7.3-linux-armv6l.tar.xz
tar -xf node-v21.7.3-linux-armv6l.tar.xz
sudo cp -R ./node-v21.7.3-linux-armv6l/* /usr/local/

# Get Git, because of course you need Git
sudo apt install -y git

# Clean your digital mess
sudo apt clean
rm node-v21.7.3-linux-armv6l.tar.xz
rm -rf node-v21.7.3-linux-armv6l/
```

_Note: Watching paint dry may be more thrilling than waiting for this to finish._

### 3. Verify Disk Space

After installation, let’s see if there’s still enough space for your dreams.

```bash
df -h
```

You’re hoping for something like this:

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/mmcblk0p2  3.2G  2.2G  844M  72% /
```

If not, congratulations—you’ve created a very expensive digital paperweight.

### 4. GitHub Setup

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com
```

If GitHub doesn’t yell at you, you did it right.

### 5. Clone Repository

```bash
git clone git@github.com:wujood/home-control.git
cd home-control
```

It's alive! (Kinda.)

### 6. Reboot

You’ve come this far—give your Pi a quick nap.

```bash
sudo reboot
```

Cross your fingers. Offer a small prayer. Maybe light a candle.

### 7. Install npm Dependencies

Ah yes, the part where we beg the npm gods for mercy.

```bash
npm ci
```

**Why `npm ci` instead of `npm install`?**
Because `npm install` will try to build the entire universe from source, and your Pi will collapse under the weight of TLS handshakes and existential dread.

### 8. 🚀 Run It

You've come this far. You've suffered. You've waited. You've probably aged a little. But now, it's time to **run the thing**.

```bash
node index.js
```

Or better yet—don’t. Use `nohup` because this system has the stability of a house of cards in a wind tunnel:

```bash
nohup node index.js > run.log 2>&1 &
```

#### What to expect:

- No errors? A miracle. Light a candle.
- Some errors? That’s expected. Embrace the chaos.
- Nothing happens? Welcome to debugging on a Pi 1. Try `tail -f run.log` and prepare for ASCII-based disappointment.

#### Optional:

If you're feeling bold (and lazy), create a cron job or systemd service to start this on boot. But remember: if it fails silently, it’s probably still running… somewhere… doing **something** and it will keep doing this (as you told it) **on boot** so you will crash your system over and over again.

```bash
ps aux | grep node
```

If you see it running, congratulations. You now have a smart home controller running on a CPU that once lost a benchmark to a toaster.

## 📊 Learnings

- **Binary Packages Are Evil**
  Anything that needs to compile native code will likely make your Pi cry. Avoid like you avoid software updates on a Friday.

- **TLS Handshakes Are Not Friendly**
  TLS is great—unless you’re using a Pi 1, in which case it’s a flaming hoop your system has to limbo under while blindfolded.

- **Fastify Defaults Are a Lie**
  Fastify assumes your server is, you know, _fast_. You’ll want to adjust the timeout settings so your Pi doesn’t rage-quit before responding.

- **Yes, It’s Slow**
  It was slow in 2012. It’s still slow now. But it works. Barely. And isn’t that the whole point?

---

Built with love, sarcasm, and a total disregard for hardware limitations.

Enjoy 💾🔥
