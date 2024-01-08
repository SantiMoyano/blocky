package dev.santiagom.blocky.tables.subtask.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubtaskDTO {

    private String description;
    private Long taskId;
}
