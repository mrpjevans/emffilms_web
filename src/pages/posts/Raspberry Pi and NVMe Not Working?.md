---
layout: blog.liquid
title: Raspberry Pi and NVMe SSD Not Working?
permalink: "{{ title | slugify }}/"
image: argon40-nvme.jpeg
imageAlt: Underside of the Argon ONE NVMe Case
tags:
  - RaspberryPi
---

With the arrival of Raspberry Pi 5 it's a brave new world for my favourite little computer. The new shiny PCI-Express header allows super-duper-fast peripherals to bypass the bottleneck that is USB. An instant ask is for NVMe SSD drive support. One of the first to appear, pictured here, is the classic Argon ONE case updated for Raspberry Pi 5 and an NVMe M.2 to PCI-E adaptor built into the base.

I eagerly procured a 1TB NVMe SSD, popped open the bottom of the case, fitted the PCB, put everything back together again, made sure the ribbon cable was correctly connected to both the Pi and the drive, booted and ...nothing. The Raspberry Pi happily booted off the existing SD Card, but no sign of the NVMe drive in `/dev`. Nada. Ziltch.

If you've found yourself in the same boat, here's the solution. The current stock bootloader *does not support* NVMe devices. The OS will simply ignore them. To get everything running:

- Open a command line terminal
- Run: `sudo raspi-config`
- When the menu appears, select `Advanced Options`
- Then `Bootloader Version`
- Finally `Latest` to select the bootloader with NVMe support
- Confirm with `Yes` 
- Press escape until you are asked if you want to reboot - you do

When the OS has rebooted:

- Open a terminal window
- Run: `blkid`
- Look at the results - you should now see a `/dev/nvme*` device

You're now ready to partition and format the drive. Once it's ready for use, you can use `raspi-config` again to set it to be the default boot drive and say goodbye to SD cards.
