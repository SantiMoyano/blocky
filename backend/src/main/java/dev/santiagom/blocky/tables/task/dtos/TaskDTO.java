package dev.santiagom.blocky.tables.task.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

    private String name;
    private Long categoryId;
    private Long epicId;
}
