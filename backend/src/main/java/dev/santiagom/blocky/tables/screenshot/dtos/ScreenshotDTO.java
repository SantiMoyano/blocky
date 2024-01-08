package dev.santiagom.blocky.tables.screenshot.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScreenshotDTO {

    private String name; // for alt assign
    private String url;
    private Long projectId;

}
