package com.gpcodefusion.dhoni.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String showHomePage() {
        return "L_UI/UI";
        // Ye UI.html ko load karega from templates folder
    }

}
